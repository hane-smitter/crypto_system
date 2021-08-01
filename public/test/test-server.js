var chai = require('chai');
var server = require('../public/test/apiTest');
var should = chai.should();

describe('data', function(){
  it('should list ALL coins on /coins GET');
  it('should list a SINGLE coin on /blob/<id> GET');
  it('should add a SINGLE coin on /blobs POST');
  it('should update a SINGLE coin on /blob/<id> PUT');
  it('should delete a SINGLE coin on /blob/<id> DELETE');
});
// ahh
