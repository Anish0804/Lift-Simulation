param(
    [string]$PASTEBIN_API_KEY,
    [string]$PASTE_ID,
    [string]$PASTE_USER_KEY,
    [string]$NGROK_URL
)

$url = "https://pastebin.com/api/api_post.php"
$body = @{
    api_option = "edit"
    api_dev_key = $PASTEBIN_API_KEY
    api_paste_code = $NGROK_URL
    api_paste_key = $PASTE_ID
    api_paste_user_key = $PASTE_USER_KEY
    api_paste_name = "NgrokURL"
    api_paste_expire_date = "N"
    api_paste_format = "text"
}

Invoke-RestMethod -Uri $url -Method Post -Body $body