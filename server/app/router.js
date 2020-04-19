'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('./db/db');

module.exports = app => {
  const { router, controller } = app;

  db(app);

  const resource = app.middleware.resource();
  const response = app.middleware.response();
  const get_id = app.middleware.getId();
  const login = app.middleware.login();
  const auth = app.middleware.auth();

  router.get('/', controller.home.index);

  // admin

  // 登录
  router.post('/admin/api/login', login, controller.admin.login);

  // 获取全部资源
  router.get('/admin/api/:resource', auth, response, resource, controller.admin.get_source);

  // 获取单个资源
  router.get('/admin/api/:resource/:id', auth, response, resource, get_id, controller.admin.get_source_id);

  // 更新资源
  router.put('/admin/api/:resource/:id', auth, response, resource, get_id, controller.admin.update_source);

  // 删除资源
  router.delete('/admin/api/:resource/:id', auth, response, resource, get_id, controller.admin.dele_source);

  // 创建资源
  router.post('/admin/api/:resource', auth, response, resource, controller.admin.create_source);


  // index

  // 获取文章列表
  router.get('/index/api/articles', response, controller.index.get_all_articles);

  //获取置顶文章
  router.get('/index/api/articles/top', response, controller.index.get_top_articles);

  // 获取指定页码的文章
  router.get('/index/api/articles/:pageNum', response, controller.index.get_pageNum_articles);

  // 获取文章详情     category 外键填充
  router.get('/index/api/article/:id', response, controller.index.get_article_detail);

  // 按照 create 年份 进行归类后的文章数据
  router.get('/index/api/archive', response, controller.index.get_years_articles);

  // 按照 category 进行归类后的文章数据
  router.get('/index/api/tags', response, controller.index.get_tags_articles);


};