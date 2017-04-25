# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-24 15:49
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtaildocs.blocks
import wagtail.wagtailimages.blocks
import wagtailmath.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_auto_20170424_0746'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock()), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock()), ('document', wagtail.wagtaildocs.blocks.DocumentChooserBlock()), ('equation', wagtailmath.blocks.MathBlock()))),
        ),
    ]