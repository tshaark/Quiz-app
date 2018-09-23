import React, { Component } from 'react';
// import './LoginPerson.css';

var UserProfile = (function() {
    var userEmail = "";
    var getEmail = function() {
      return userEmail;
    };
  
    var setEmail = function(email) {
      userEmail = email;
    };
  
    return {
      getEmail: getEmail,
      setEmail: setEmail
    }
  
  })();
  
  export default UserProfile;
  