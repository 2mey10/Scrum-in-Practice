#!/usr/bin/env python
# coding: utf-8

import numpy as np
import pandas as pd
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



# needed arguments from frontend:
# * model_path
# * data_link
# * task resp. 'role_name'



def to_numpy(tensor):
    return tensor.detach().cpu().numpy() if tensor.requires_grad else tensor.cpu().numpy()



def evaluate_model(model_path, test_data_loader, task):
    # request onnx model for given username and datetime from database resp. load model from path
    student_model = onnx.load(model_path)
    onnx.checker.check_model(student_model)
    ort_session = onnxruntime.InferenceSession(model_path)
    
    #student_model.eval()    # necessary??? does not work on onnx loaded model
    
    performance_scores = []
    
    if task == "Klassifizierung":
        y_pred, y_true = classify_test_data(ort_session, test_data_loader)
        target = torch.tensor(y_true)
        preds = torch.tensor(y_pred)
        #n_classes = len(set(y_true))
        n_classes = len(np.unique(y_true))
        # n_classes = len(collections.Counter(y_true).keys())
        
        #accuracy
        acc = (y_pred.round() == y_true).astype(float).mean()
        performance_scores.append(acc)
        
        # F1 score
        f1_metric = F1Score(task="multiclass", num_classes=n_classes)
        f1_score = round(f1_metric(preds, target).item(), 4)
        performance_scores.append(f1_score)
        
        precision_metric = Precision(task="multiclass", average='macro', num_classes=n_classes)
        precision_score = round(precision_metric(preds, target).item(), 4)
        performance_scores.append(precision_score)
        
        recall_metric = Recall(task="multiclass", average='macro', num_classes=n_classes)
        recall_score = round(recall_metric(preds, target).item(), 4)
        performance_scores.append(recall_score)
        
    elif task == "Segmentierung":
        y_pred, y_true = segment_test_data(ort_session, test_data_loader)        
        target = torch.tensor(y_true)
        preds = torch.tensor(y_pred)
        n_classes = len(set(y_true))
        
        iou_score = tf.keras.metrics.MeanIoU(num_classes=n_classes)
        performance_scores.append(iou_score)
        # single class IoU calculation
        #intersection = numpy.logical_and(result1, result2)
        #union = numpy.logical_or(result1, result2)
        #iou_score = numpy.sum(intersection) / numpy.sum(union)
        #print(‘IoU is %s’ % iou_score)
        
        
        from torchmetrics import Dice
        dice = Dice(average='micro')
        dice_score = dice(preds, target)
        performance_scores.append(iou_score)
        
    return performance_scores



def classify_test_data(session, data_loader):
    y_pred = []
    y_true = []
    for i, (img_or_text, labels) in enumerate(data_loader):
        #img_or_text = img_or_text.cuda()
        #x = model(img_or_text)
        
        ort_inputs = {session.get_inputs()[0].name: to_numpy(img_or_text)}
        ort_outs = session.run(None, ort_inputs)
        out_y = ort_outs[0]
        #for i in range(10): print(ort_outs)
        #value, pred = torch.max(out_y, 1)
        pred = np.argmax(out_y)
        #pred = pred.data.cpu()
        #y_pred.extend(list(pred.numpy()))
        #y_true.extend(list(labels.numpy()))
        #for i in range(10): print(labels)
        y_pred.append(pred)
        y_true.append(labels.numpy()[0])
    return np.array(y_pred), np.array(y_true)



def segment_test_data(session, data_loader):
    y_pred = []
    y_true = []
    for i, (images, labels) in enumerate(data_loader):
        #images = images.cuda()
        # make the prediction, pass the results through the sigmoid
        # function, and convert the result to a NumPy array
        predMask = model(images).squeeze()
        predMask = torch.sigmoid(predMask)  # values between 0 and 1
        predMask = predMask.cpu().numpy()
        predMask = (predMask > config.THRESHOLD)  # binary class labels for binary problem
        predMask = predMask.astype(np.uint8)
        
        #pred = model.forward(x)
        
        #images = images.cuda()
        #x = model(images)
        #value, pred = torch.max(x, 1)
        #pred = pred.data.cpu()
        #y_pred.extend(list(pred.numpy()))
        #y_true.extend(list(labels.numpy()))
    return np.array(y_pred), np.array(y_true)    



# input from frontend

# TODO: get argument model_path from the frontend
model_path = "CNN_Model_MNIST_Best.onnx"
# TODO: get argument task/role_name from the frontend
task = "Klassifizierung"



# load data set

# TODO: load data set from link instead of PyTorch's built-in datasets
if task == "Klassifizierung":
    test_data = datasets.MNIST(
        root="data",
        train=False,
        download=True,
        transform=transforms.ToTensor()
    )
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