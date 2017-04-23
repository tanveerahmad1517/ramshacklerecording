# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-10 16:18
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_delete_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvariant',
            name='request_count',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]