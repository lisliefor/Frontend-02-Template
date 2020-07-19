// 第2节练习：完成 StringToNumber 和 NumberToString 两个函数

/**
 * 字符串转十进制数字
 * @param {string} str 
 */
function stringToNumber (str) {
    const num = new Number(str);
    if (isNaN(num.valueOf())) {
        console.log(`字符串${str}无法转换为有效数值。`);
        return;
    }
    return num.valueOf();
}

/**
 * 数字转字符
 * @param {number} num 
 * @param {2, 8, 10, 16} scale 
 */
function numberToString (num, scale) {
    const num = new Number(num);
    if (isNaN(num.valueOf())) {
        console.log(`输入项${num}不是有效的数字。`);
        return;
    }
    if ([2, 8, 10, 16].indexOf(scale) === -1) {
        console.log(`输入进制数${scale}不合理，只支持转换2、8、10、16进制。`);
        return;
    }
    return num.valueOf().toString(scale);
}

// 第7节练习：尝试找出 JavaScript 引擎里面 Realm 所有的对象，使用一个 JS 数据可视化的框架去做一个可视化
const data = [
    {
      name: "Realm",
      children: [
        { name: "Collection" },
        { name: "List" },
        { name: "Object" },
        {
          name: "Permissions",
          children: [
            { name: "Class" },
            { name: "Permission" },
            { name: "Realm" },
            { name: "Role" },
            { name: "User" },
          ],
        },
        { name: "Results" },
        {
          name: "Sync",
          children: [
            { name: "Adapter" },
            { name: "AsyncOpenTask" },
            { name: "AuthError" },
            { name: "ChangeEvent" },
            { name: "Credentials" },
            { name: "IncompatibleSyncedRealmError" },
            { name: "LocalRealm" },
            { name: "NamedSubscription" },
            { name: "Session" },
            { name: "Subscription" },
            {
              name: "User",
              children: [
                { name: "PermissionChange" },
                { name: "PermissionOffer" },
                { name: "PermissionOfferResponse" },
              ],
            },
          ],
        },
        { name: "Worker" },
      ],
    },
  ];
  
  echarts.util.each(data.children, function (datum, index) {
    index % 2 === 0 && (datum.collapsed = true);
  });
  
  myChart.setOption(
    (option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "tree",
  
          data: [data],
  
          top: "1%",
          left: "7%",
          bottom: "1%",
          right: "20%",
  
          symbolSize: 7,
  
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 9,
          },
  
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
  
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    })
  );
  