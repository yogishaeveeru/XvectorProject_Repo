from django.shortcuts import render
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from .models import Xvector
from .serializers import XvectorSerializer
from django.http import HttpResponseRedirect
from django.urls import reverse
import pandas as pd
from XvectorProject.settings import MEDIA_ROOT
import os


# Create your views here.
def index(request):
    return render(request,'xvector_Home.html',{})

dupli=False
def datas(request):
    global dupli
    unit=Xvector.objects.all()
    context={"data":unit,'dupli':dupli}
    dupli=False
    return render(request,'xvector_data.html',context)
# val=0
# operation=0
# d=0
# oplist=["Min","Max","Sum"]

@csrf_exempt
def plot(request):
    unit=Xvector.objects.all()
    return render(request,'xvector_plot.html',{})
    
@csrf_exempt
def upload(request):
    global dupli
    file=request.FILES['cfile']
    fname=request.POST['fname']+'.csv'
    df = pd.read_csv(file).head(25)
    x=[*df]
    y=df.dtypes.astype("str").to_list()
    z=["","","","",""]
    k=0
    for i in range(len(x)):
        if (("float" in y[i]) or ("int" in y[i])) and k<4:
            z[k]=x[i]
            k+=1
    p=[]
    for i in range(4):
        try:
            p.append(df[z[i]].to_list())
        except:
            p.append("")
            continue
    try:
        unit=Xvector(file_name=file,column1=p[0],column2=p[1],column3=p[2],column4=p[3],col=z)
        unit.save()
        la=Xvector.objects.last()
        oldname=MEDIA_ROOT+f'/{la.file_name}'
        newname=MEDIA_ROOT+f'/{fname}'
        os.rename(oldname,newname)
        la.file_name=fname
        la.save()
    except :
        la=Xvector.objects.last()
        la.delete()
        dupli=True
    return HttpResponseRedirect(reverse('data'))

class DataViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = Xvector.objects.all()
    serializer_class = XvectorSerializer