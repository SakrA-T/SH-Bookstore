<?php
$id=$_GET['userid'];

$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":-1,\"msg\":\"连接数据库时出现错误！请联系系统管理员进行修复！\r\nerror code:".mysqli_connect_error()."\"}");

$query="SELECT * from userinfo where id = $id";

$result = mysqli_query($link, $query);
$row = mysqli_fetch_object($result);

$data = "[";

$data .= "{\"user\":\"" . $row->name . "\",\"num\":" . $row->num . ",\"qq\":" . $row->QQ . ",\"clg\":\"" . $row->college . "\",\"sale\":" . $row->salecount . ",\"buy\":" . $row->buycount . ",\"photo\":\"" . $row->photo . "\"}";

$data .= "]";

mysqli_close($link);
// echo $id;
echo $data;