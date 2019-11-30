# 微信小程序vue的管理接口

```javascript
    // 用户登录
    userlogin: '/api/v1/userInfo',

    // 用户注册
    userRegiser: '/api/v1/register'    

    // 保存事件信息
    saveEvent: '/api/v1/saveEvent',
    // 分页获取事件信息
    getEventInfoByPage: '/api/v1/getEventByPage/{page}/{size}',
    // 添加事件处置的详细信息
    addDetailInfo: '/api/v1/saveDetail',
    // 获取事件的处置详细信息集合
    getListDetailInfo: '/api/v1/getListInfo/{eventId}',
    // 根据事件的id获取事件的时间轴信息
    getTimeSheetInfoByEventId: '/api/v1/getTimeSheetInfoByEventId/{id}',
    // 保存标题的信息
    saveTitle: '/api/v1/saveTitle',
    // 获取标题信息的集合
    getListTitle: '/api/v1/titelLiist',

    // 保存电影信息
    saveMovicesInfo: '/api/v1/saveMovice',

    // 根据类型id获取电影的信息
    getMovicesInfoByTitleId: '/api/v1/getMovicesByTitleId',

    // 根据标题的id删除标题的名称
    deleteTitleById: '/api/v1/delteTitleById',

    // 根据电影的id删除电影
    deleteMovicesInfoById: '/api/v1/delteMovicesInfoById'


```

