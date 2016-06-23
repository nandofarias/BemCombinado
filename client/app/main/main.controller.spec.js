describe('MainController', function () {

    var controller;

    beforeEach(function() {
        module('app.main', function($provide) {
            $provide.value('routerHelper', {
                configureStates: function () {

                }
            });


        });

        inject(function ($controller, _ngDialog_) {
            controller = $controller('mainController', {
                ngDialog: _ngDialog_
            });
        })
    });


    it('should have title', function () {
        expect(controller.title).to.be.equal("mainController");
    });

    it('should have signup function', function () {
        expect(controller.signup).to.be.a('function');
    });

    it('can create tasks', function () {
        expect(controller.createTask).to.be.a('function');
    });

    it('should have dropdown items', function () {
        expect(controller.dropdownItems).to.not.be.empty;
    })



});