describe('MainCtrl', function () {
  beforeEach(module('user'));

  var sampleCtrl, scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    sampleCtrl = $controller('MainCtrl', {
        $scope: scope
      });
  }));

  describe('variable types test', function() {

    it('checkExpiry, function', function(){
      expect(typeof scope.checkExpiry).toBe('function');
    });

    it('pets, array', function(){
      expect(Array.isArray(scope.pets)).toBe(true);
    });

    it('vaccines, array', function(){
      expect(Array.isArray(scope.vaccines)).toBe(true);
    });

    it('requests, array', function(){
      expect((Array.isArray(scope.requests))).toBe(true);
    });

    it('cancelRequest, function', function(){
      expect(typeof scope.cancelRequest).toBe('function');
    });

    it('editPet, function', function(){
      expect(typeof scope.editPet).toBe('function');
    });

    it('addPet, function', function(){
      expect(typeof scope.addPet).toBe('function');
    });

    it('updatePet, function', function(){
      expect(typeof scope.updatePet).toBe('function');
    });

  });

});