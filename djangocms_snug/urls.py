# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

from django.conf.urls import patterns, url

from .views.dashboard import DashboardView

urlpatterns = patterns(
    "",
    # Token Authentication
    url(r"^api/auth/api-token-auth/", view="rest_framework_jwt.views.obtain_jwt_token"),
    url(r"^api/auth/api-token-verify/", view="rest_framework_jwt.views.verify_jwt_token"),
    url(r"^api/auth/api-token-refresh/", view="rest_framework_jwt.views.refresh_jwt_token"),

    # Everything else is catched by the dashboard view and handled by ui-router from here.
    url(r"^", view=DashboardView.as_view(), name="djangocms_snug_dashboard"),
)
