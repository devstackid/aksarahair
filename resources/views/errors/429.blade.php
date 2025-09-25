@extends('errors::minimal')

@section('title', __('Request Ditolak'))
@section('code', '429')
@section('message_title', __('Terlalu Banyak Request'))
@section('message_description', __('Anda melakukan terlalu banyak permintaan dalam waktu singkat. Silakan tunggu sebentar dan coba lagi nanti.'))

