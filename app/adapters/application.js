import DS from 'ember-data';
import config from '../config/environment';
import Ember from 'ember';
import App from '../app';

var Adapter, header = {};
header.Accept = "application/json";

Adapter = DS.RESTAdapter.extend({
  namespace: "blog_interface",
  corsWithCredentials: true,
  headers: header,
  ajax: function (url, type, hash) {
    return this._super(url, type, hash);
  },
  ajaxSuccess: function (xhr, resData) {
    var exception = resData.exception || {};

    // + 1000 成功
    // + 2000 未知错误
    // + 2001 没有子域名
    // + 2002 子域名无效
    // + 2003 用户未登录
    // + 2004 用户邮箱无效
    // + 2005 没有找到该资源
    // + 2006 ForwardEmail对象status属性非法（不是 0 or 1）
    // + 2007 没有权限更新(非wechat，weibo，email的渠道不能执行update)
    // + 2008 configuration_data保存失败
    // + 2009 公司的ytxapp_status非YtxappClose
    // + 2010 未知的客服工作状态(正常工作状态为YtxappVoipOnline, YtxappPhoneOnline, YtxappOffline)
    // + 2011 没有ytxapp_present_calllog
    // + 3001 登录邮箱未注册
    // + 3002 登录密码无效
    // + 3003 登录邮箱为空
    // + 3004 登录密码为空
    // + 3005 token失效或错误

    var code = resData.code;
    delete resData.code;
    switch (code) {
      case 1000:
        return this._super(xhr, resData);
      // case 2003:
      // case 2004:
      // case 3001:
      //   return location.replace("/hc");
      case 3005:
        return location.replace("/users/sign_in");
      default :
        return new DS.InvalidError(exception);
      //case 2000:
      //  return new DS.InvalidError(resData);
      ////return new DS.InvalidError(resData.exception);
      //

      //case 3002:
      //case 3003:
      //case 3004:

    }

    //delete resData.code;
    //delete resData.exception;
    //delete resData.notice;
    //delete resData.errors;
    //
    //return this._super(xhr, resData);
  },
  pathForType: function (type) {
    var decamelized, underscored;
    decamelized = Ember.String.decamelize(type);
    underscored = Ember.String.underscore(decamelized);
    return Ember.String.pluralize(underscored);
  },
  ajaxError: function (xhr, resData) {
    var defaultAjaxError;
    defaultAjaxError = this._super(xhr);
    if (xhr) {
      switch (xhr.status) {
        case 401:
          return new App.UnauthorizedError();
      }
    }
    return defaultAjaxError;
  }
});

export default Adapter;
