# Generated by Django 3.2 on 2022-12-16 12:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='compare_price',
        ),
    ]
