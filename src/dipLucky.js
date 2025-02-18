/**
 *
 * 粘喜气
 *
 *  */

const fetch = require('node-fetch');
const { headers } = require('./config');

function delay(t, val) {
  return new Promise(function(resolve) {
      setTimeout(function() {
          resolve(val);
      }, t);
  });
}

async function dipLucky() {
  const response = await fetch('https://juejin.cn/user/center/lottery?from=lucky_lottery_menu_bar');
  await delay(Math.random() * 1000 * 3);

  const list = await fetch('https://api.juejin.cn/growth_api/v1/lottery_history/global_big', {
    headers,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ page_no: 1, page_size: 5 })
  }).then((res) => res.json());

  const res = await fetch('https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky', {
    headers,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ lottery_history_id: list.data.lotteries[0].history_id })
  }).then((res) => res.json());

  if (res.err_no !== 0) return Promise.reject('网络异常！');

  if (res.data.has_dip) return `今日已经沾过喜气！喜气值：${res.data.total_value}`;

  if (res.data.dip_action === 1) return `沾喜气成功！喜气值：${res.data.total_value}`;
}

module.exports = dipLucky;
