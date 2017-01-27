'use strict'

angular.module('mymusicApp.directives', [])

.directive('ngConfirmClick', [ function () {
  return {
    priority: -1,
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('click', function (e) {
        var message = attrs.ngConfirmClick
        if (message && !window.confirm(message)) {
          e.stopImmediatePropagation()
          e.preventDefault()
        }
      })
    }
  }
}])

.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel)
      var modelSetter = model.assign
      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0])
        })
      })
    }
  }
}])

.directive('integer', function () {
  return {
    require: 'ngModel',
    link: function (scope, ele, attr, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        return parseInt(viewValue, 10)
      })
    }
  }
})

.directive('isActive', ['$location', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, ele, attr, ctrl) {
      scope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (ele[0].href === $location.absUrl()) {
          angular.element(ele[0].parentNode).attr('class', 'active')
        } else {
          angular.element(ele[0].parentNode).attr('class', '')
        }
      })
    }
  }
}])

.directive('menu', function () {
  return {
    restrict: 'E',
    scope: false,
    replace: true,
    templateUrl: 'components/menu.html',
    link: function (scope, element, attrs) {
      scope.isNavCollapsed = true
      scope.isCollapsed = false
      scope.isCollapsedHorizontal = false
    }
  }
})
