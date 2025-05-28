#!/bin/bash

dir_shell=/ql/shell
. $dir_shell/env.sh
. $dir_shell/share.sh

log_with_style() {
  local level="$1"
  local message="$2"
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

  printf "\n[%s] [%7s]  %s\n" "${timestamp}" "${level}" "${message}"
}

echo -e "======================1. 检测配置文件========================"
import_config "$@"
make_dir /etc/nginx/conf.d
make_dir /run/nginx
init_nginx
fix_config
log_with_style "INFO" "🕵️  检测配置文件完成..."

pm2 l &>/dev/null

echo -e "======================2. 安装依赖========================"
patch_version
log_with_style "INFO" "📦  安装依赖完成..."

echo -e "======================3. 启动nginx========================"
nginx -s reload 2>/dev/null || nginx -c /etc/nginx/nginx.conf
echo -e "nginx启动成功...\n"
log_with_style "INFO" "🔄  nginx启动成功..."

echo -e "======================4. 启动pm2服务========================"
reload_update
reload_pm2
log_with_style "INFO" "⚙️  pm2服务启动成功..."

if [[ $AutoStartBot == true ]]; then
  echo -e "======================5. 启动bot========================"
  nohup ql bot >$dir_log/bot.log 2>&1 &
  log_with_style "INFO" "🤖  bot后台启动中..."
fi

if [[ $EnableExtraShell == true ]]; then
  echo -e "====================6. 执行自定义脚本========================"
  nohup ql extra >$dir_log/extra.log 2>&1 &
  log_with_style "INFO" "🛠️  自定义脚本后台执行中..."
fi

echo -e "############################################################"
log_with_style "SUCCESS" "🎉  容器启动成功!"
echo -e "############################################################"

tail -f /dev/null

exec "$@"
