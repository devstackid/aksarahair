@extends('errors::minimal')

@section('title', __('Server Error'))
@section('code', '500')
@section('message_title', __('Server Error'))
@section('message_description', __('Terjadi kesalahan pada server. Mohon coba beberapa saat lagi atau hubungi administrator.'))
