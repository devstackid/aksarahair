<?php

// namespace App\Events;

// use Illuminate\Broadcasting\Channel;
// use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
// use Illuminate\Queue\SerializesModels;

// class PaymentSuccess implements ShouldBroadcastNow
// {
//     use SerializesModels;

//     public $notificationId;
//     public $nama_pelanggan;

//     public function __construct($notificationId, $nama_pelanggan)
//     {
//         $this->notificationId = $notificationId;
//         $this->nama_pelanggan = "Transaksi baru atas nama {$nama_pelanggan}!";
//     }

//     public function broadcastOn(): Channel
//     {
//         return new Channel('payment-channel');
//     }

//     public function broadcastAs()
//     {
//         return 'payment-success';
//     }
// }
