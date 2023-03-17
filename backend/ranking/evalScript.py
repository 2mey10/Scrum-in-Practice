#!/usr/bin/env python
# coding: utf-8

# ### new in this version 
# using sklearn metrics instead of torchmetrics (Thomas) + load test data from .zip file


import numpy as np
import pandas as pd
import zipfile
import onnx
import onnxruntime
from PIL import Image
import torch
from torch import nn
import torch.nn.init as init
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from torchmetrics.classification import F1Score
from torchmetrics.classification import Precision
from torchmetrics.classification import Recall
from sklearn.metrics import f1_score, accuracy_score, precision_score, recall_score


# needs the following arguments from frontend:
# * model_path
# * test_data_path
# * task resp. 'role_name'


# run script by calling function start_evaluation(model_path, task, test_data_zip_path)


# for the onnxruntime session
def to_numpy(tensor):
    return tensor.detach().cpu().numpy() if tensor.requires_grad else tensor.cpu().numpy()


def classify_test_data(session, data_loader):
    y_pred = []
    y_true = []
    for i, (img_or_text, labels) in enumerate(data_loader):
        ort_inputs = {session.get_inputs()[0].name: to_numpy(img_or_text)}
        ort_outs = session.run(None, ort_inputs)
        out_y = ort_outs[0]
        # for i in range(10): print(ort_outs) # test
        # value, pred = torch.max(out_y, 1)
        pred = np.argmax(out_y)
        # pred = pred.data.cpu()
        # y_pred.extend(list(pred.numpy()))
        # y_true.extend(list(labels.numpy()))
        # for i in range(10): print(labels)
        y_pred.append(pred)
        y_true.append(labels.numpy()[0])
    return np.array(y_pred), np.array(y_true)


def segment_test_data(session, data_loader):
    y_pred = []
    y_true = []
    for i, (images, labels) in enumerate(data_loader):
        # images = images.cuda()
        # make the prediction, pass the results through the sigmoid
        # function, and convert the result to a NumPy array
        predMask = model(images).squeeze()
        predMask = torch.sigmoid(predMask)  # values between 0 and 1
        predMask = predMask.cpu().numpy()
        predMask = (predMask > config.THRESHOLD)  # binary class labels for binary problem
        predMask = predMask.astype(np.uint8)

        # pred = model.forward(x)

        # images = images.cuda()
        # x = model(images)
        # value, pred = torch.max(x, 1)
        # pred = pred.data.cpu()
        # y_pred.extend(list(pred.numpy()))
        # y_true.extend(list(labels.numpy()))
    return np.array(y_pred), np.array(y_true)


def evaluate_model(model_path, test_data_loader, task):
    # load onnx model from path
    student_model = onnx.load(model_path)
    onnx.checker.check_model(student_model)
    ort_session = onnxruntime.InferenceSession(model_path)

    # student_model.eval()    # necessary? does not work on onnx loaded model

    if task == "Klassifizierung":
        y_pred, y_true = classify_test_data(ort_session, test_data_loader)
        target = torch.tensor(y_true)
        preds = torch.tensor(y_pred)
        n_classes = len(np.unique(y_true))
        # n_classes = len(collections.Counter(y_true).keys())

        performance_scores = {
            "accuracy": -1,
            "F1": -1,
            "precision": -1,
            "recall": -1
        }

        # accuracy
        acc_value = (y_pred.round() == y_true).astype(float).mean()
        performance_scores["accuracy"] = round(acc_value, 4)

        # F1 score
        f1_score_value = f1_score(y_true=target.detach().numpy(), y_pred=preds.detach().numpy(), average='weighted')
        performance_scores["F1"] = round(f1_score_value, 4)
        # f1_metric = F1Score(task="multiclass", num_classes=n_classes)
        # f1_score = round(f1_metric(preds, target).item(), 4)
        # performance_scores["F1"] = f1_score

        precision_score_value = precision_score(y_true=target.detach().numpy(), y_pred=preds.detach().numpy(),
                                                average='micro', zero_division=True)
        performance_scores["precision"] = round(precision_score_value, 4)
        # precision_metric = Precision(task="multiclass", average='macro', num_classes=n_classes)
        # precision_score = round(precision_metric(preds, target).item(), 4)
        # performance_scores["precision"] = precision_score

        recall_score_value = recall_score(y_true=target.detach().numpy(), y_pred=preds.detach().numpy(),
                                          average='micro')
        performance_scores["recall"] = round(recall_score_value, 4)
        # recall_metric = Recall(task="multiclass", average='macro', num_classes=n_classes)
        # recall_score = round(recall_metric(preds, target).item(), 4)
        # performance_scores["recall"] = recall_score

    elif task == "Segmentierung":
        y_pred, y_true = segment_test_data(ort_session, test_data_loader)
        target = torch.tensor(y_true)
        preds = torch.tensor(y_pred)
        n_classes = len(set(y_true))

        performance_scores = {
            "IoU": -1,
            "dice": -1
        }

        iou_score = tf.keras.metrics.MeanIoU(num_classes=n_classes)
        performance_scores["IoU"] = round(iou_score, 4)
        # single class IoU calculation
        # intersection = numpy.logical_and(result1, result2)
        # union = numpy.logical_or(result1, result2)
        # iou_score = numpy.sum(intersection) / numpy.sum(union)
        # print(‘IoU is %s’ % iou_score)

        from torchmetrics import Dice
        dice = Dice(average='micro')
        dice_score = dice(preds, target)
        performance_scores["dice"] = round(dice_score, 4)

    return performance_scores


def start_evaluation(model_path, task, test_data_zip_path):
    # delete if other evaluation tasks are implemented
    task = "Klassifizierung"

    print("Original: " + test_data_zip_path)

    # TODO: check if zip already unpacked to directory
    test_data_foldername = test_data_zip_path.split("/")[-1].split(".")[0]  # folder name without ".zip" ending

    print(test_data_foldername)

    unzip_path = "/".join(test_data_zip_path.split("/")[0:-1])

    print(unzip_path + test_data_foldername)

    with zipfile.ZipFile(test_data_zip_path, 'r') as zip:
        zip.extractall(unzip_path + '/' + test_data_foldername)
    test_data_path = "/".join([unzip_path, test_data_foldername])  # unzip_path

    if task == "Klassifizierung":
        test_data = datasets.ImageFolder(test_data_path,
                                         transforms.Compose([
                                             transforms.ToTensor(),
                                             transforms.Grayscale(1),
                                             transforms.Resize((28, 28))
                                         ]))
    elif task == "Segmentierung":
        # buit-in dataset https://pytorch.org/vision/stable/generated/torchvision.datasets.CocoDetection.html#torchvision.datasets.CocoDetection
        test_data = datasets.CocoDetection(
            root="data",
            train=False,
            download=True,
            transform=transforms.ToTensor()
        )

    # TODO: change code above for a batch length >1
    batch_len = 1
    test_data_loader = DataLoader(test_data, batch_size=batch_len, shuffle=True)

    # start model evaluation
    performance_scores = evaluate_model(model_path, test_data_loader, task)
    print(performance_scores)

    return performance_scores
