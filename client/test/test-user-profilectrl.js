describe('ProfileCtrl', function () {
  beforeEach(module('user'));

  var sampleCtrl, scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    sampleCtrl = $controller('ProfileCtrl', {
        $scope: scope
      });
  }));

  describe(' variable types test', function () {

    it('scope.updateUser, function', function(){
      expect(typeof scope.updateUser).toBe('function');
    });

    it('scope.deleteUser, function', function(){
      expect(typeof scope.deleteUser).toBe('function');
    });
    
  });

});