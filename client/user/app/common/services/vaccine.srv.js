angular.module('user.common.services')

  .service('VaccineService', function () {

    function checkExpiry (vaccine) {
      var now = Date.now();
      var onemonth = now + 2592000000;
      var expiryDate = new Date(vaccine.dateExpired).getTime();

      if (expiryDate > now) {
        return 'active';
      } else if (expiryDate < onemonth) {
        return 'expiring';
      } else {
        return 'expired';
      }
    }

    this.checkExpiry = checkExpiry;

  });
