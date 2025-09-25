import moment from 'moment';
import 'moment/locale/id'; // Import bahasa Indonesia

// Atur lokal menjadi Indonesia
moment.locale('id');

// Fungsi untuk format waktu
export const formatTimeAgo = (date) => {
  return moment(date).fromNow(); // Format dalam bahasa Indonesia
};
