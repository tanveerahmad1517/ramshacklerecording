# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-09 15:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0007_auto_20170509_1458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='octopart_bom',
            field=models.URLField(blank=True, null=True),
        ),
    ]
