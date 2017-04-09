# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-09 09:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_schematic_ramshackle_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schematic',
            name='ramshackle_project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='schematics', to='projects.Project'),
        ),
    ]
