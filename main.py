import os
import asyncio
import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
from dotenv import load_dotenv
import instaloader
import tempfile

# Load environment variables
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")

# Enable logging
logging.basicConfig(level=logging.INFO)

# Instagram download function
async def insta_download(url):
    loader = instaloader.Instaloader(dirname_pattern=tempfile.gettempdir(), save_metadata=False, download_comments=False)
    shortcode = url.strip("/").split("/")[-1]
    post = instaloader.Post.from_shortcode(loader.context, shortcode)
    loader.download_post(post, target="insta_temp")
    for file in os.listdir("insta_temp"):
        if file.endswith(".mp4"):
            return os.path.join("insta_temp", file)
    return None

# Telegram command
async def insta_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Usage: /insta <Instagram Video URL>")
        return

    url = context.args[0]
    await update.message.reply_text("Downloading...")

    try:
        video_path = await asyncio.to_thread(insta_download, url)
        if video_path:
            await update.message.reply_video(video=open(video_path, "rb"))
        else:
            await update.message.reply_text("Failed to find video.")
    except Exception as e:
        await update.message.reply_text(f"Error: {str(e)}")

# Main function
async def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("insta", insta_handler))
    await app.run_polling()

if __name__ == "__main__":
    asyncio.run(main())
