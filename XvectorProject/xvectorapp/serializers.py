from rest_framework import serializers
from .models import Xvector
from XvectorProject.settings import MEDIA_ROOT
import pandas as pd

class XvectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Xvector
        fields = ['id','file_name','column1','column2','column3','column4','col']