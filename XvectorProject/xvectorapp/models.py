from django.db import models

# Create your models here.
# def get_file_path(instance,filename):
#     filename=views.fname+'.csv'
#     return os.path.join(instance.directory_string_var,filename)

class Xvector(models.Model):
    file_name=models.FileField(upload_to='',unique=True)
    column1=models.TextField(default='')
    column2=models.TextField(default='')
    column3=models.TextField(default='')
    column4=models.TextField(default='')
    col=models.TextField(default='')

    class meta:
        db_table="xvectorapp_xvector"
