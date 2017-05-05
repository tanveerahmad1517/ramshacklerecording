# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-02 20:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0018_remove_rendition_filter'),
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homepagecarouselitem',
            name='image',
        ),
        migrations.RemoveField(
            model_name='homepagecarouselitem',
            name='page',
        ),
        migrations.AddField(
            model_name='homepage',
            name='cover_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image'),
        ),
        migrations.AddField(
            model_name='homepage',
            name='cover_text',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.DeleteModel(
            name='HomePageCarouselItem',
        ),
    ]
