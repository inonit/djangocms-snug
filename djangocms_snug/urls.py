# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

from django.conf.urls import patterns, url

from .views.dashboard import DashboardView

urlpatterns = patterns(
    "",
    url(r'^', view=DashboardView.as_view(), name="djangocms_snug_dashboard"),
)
