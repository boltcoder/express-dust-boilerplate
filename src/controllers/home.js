import BaseController from './base';

export default class HomeController extends BaseController{
  constructor(req, res, next){
    super(req, res);
  }

  showHomePage() {
    let viewParams = {};
    viewParams.js =['/js/sample.js'];
    viewParams.css = ['/css/sample.css' ];

    this.render('home',viewParams);
  }

}