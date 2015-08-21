# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

from calendar import timegm
from datetime import datetime
from rest_framework_jwt.compat import get_username, get_username_field
from rest_framework_jwt.settings import api_settings

from .views.api.auth.serializers import UserSerializer


def jwt_payload_handler(user):
    """
    Custom payload for JWT tokens.
    """

    payload = UserSerializer(user).data
    payload["exp"] = datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA
    payload[get_username_field()] = get_username(user)

    # Include original issued at time for a brand new token,
    # to allow token refresh
    if api_settings.JWT_ALLOW_REFRESH:
        payload["orig_iat"] = timegm(
            datetime.utcnow().utctimetuple()
        )

    return payload
