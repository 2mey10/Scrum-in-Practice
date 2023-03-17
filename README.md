# Scrum-in-Practice
Repository for the Scrum in Practice Workshop @OVGU 2023

Entwicklung einer Webanwendung mit React.js und Django Restframework. Das Frontend wurde mit ReactJS entwickelt. Das Backend basiert vollständig auf Django mit Django Rest Framework. 


## Features:

- Registration/Login/Logout 

- Create Course  

- Create Challenge 

- View Courses  

- View Challenges  

- View Ranking

- Submit model 

- Data Set Upload 

- Data Set Download 

- Tutor Rechte
 


## Backend-Einrichtung:

Repository klonen: git clone https://github.com/2mey10/Scrum-in-Practice.git 

Ändern des aktuellen Verzeichnises in den Backend-Ordner 

Erstellen einer virtuellen Umgebung und Installation aller Backend-Abhängigkeiten. 

Ausführen folgender Befehle:  

> python manage.py makemigrations. 

> python manage.py migrate. 

Superuser erstellen : 

> python manage.py createsuperuser 

Server ausführen: 

> python manage.py runserver. 



## Frontend-Einrichtung: 

Ändern des aktuellen Verzeichnises in den Frontend-Ordner

Installation aller Frontend-Abhängigkeiten: 

Server Ausführen: npm start

Ausführen des Backend und des Frontend 

Browser öffnen und localhost:3000 eingeben  



## nötiges Format für durch Tutoren hochgeladene Datensätze:
Trainings- und Testdaten sollten separat hochgeladen werden.
Jeder dieser beiden Datensätze sollte das durch die Klasse torchvision.datasets.ImageFolder vorgegebene Format haben (siehe https://pytorch.org/vision/stable/generated/torchvision.datasets.ImageFolder.html#torchvision.datasets.ImageFolder)
d.h. ein Ordner für Trainings- und ein Ordner für Testdaten, in jedem dieser Ordner n Unterordner mit Bildern für die n Klassen (die Unterordner sollten nachvollziehbare Klassennamen haben). Daraus müssen 2 .zip-Dateien erstellt werden.

directory/
├── class_x
│   ├── xxx.ext
│   ├── xxy.ext
│   └── ...
│   └── xxz.ext
└── class_y
    ├── 123.ext
    ├── nsdf3.ext
    └── ...
    └── asd932_.ext

Beispiele für Datensätze mit passendem Format:
https://www.kaggle.com/datasets/tongpython/cat-and-dog
https://www.kaggle.com/datasets/puneet6060/intel-image-classification 


## Hinweise für das Training:
Beim Training muss das Modell mit denselben Transforms geladen werden wie im Auswertungsskript, damit die Auswertung funktioniert, d.h. transforms.Compose([ transforms.ToTensor(), transforms.Grayscale(1), transforms.Resize((28,28)) ])
Vor dem Speichern als ONNX-Modell muss der Student für sein Modell .eval() aufrufen.


## Performance-Metriken:
Die F1-Score, precison- & recall-Berechnungen verwenden weigthed average.
