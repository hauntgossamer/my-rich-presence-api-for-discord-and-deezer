## Welcome
***This is my custom api, which integrates a user's Deezer listening history dynamically into Discord, so that people can see what the user has recently listened to and how long they've been listening.***

Here is a step by step breakdown of what this api does:
- A user with a Deezer account, a Discord account, and a Facebook account authorizes the Discord API to connect to their Discord account and update their status.
- Through the use of Python, my API automatically retieves an access token using the user's Facebook login information.
- My API then accesses the user's Deezer listening history using that token and sets variables related to the most recent song played.
- My API uses the Discord API to modify the user's Discord status dynamically with the previously mentioned variables.
- My API refreshes the user's Discord status with the most recently played song, every 30 seconds.
<br>

# Follow these easy steps to start using my API! (But only if you're on a *Windows* machine)
<br>

## If you don't have a Discord account, or the Desktop Discord Client:
1. Sign up [here](https://discord.com/register)!
2. Download and install the Desktop Discord Client with [this](https://discord.com/api/download?platform=win)
<br>

## If you don't have a Deezer account or Deezer for Desktop:
1. Sign up for Deezer [here](https://www.deezer.com/us/register) and make sure to *sign up with Facebook*
2. Download and install *Deezer for Desktop* [here](https://www.microsoft.com/en-us/p/deezer-music/9nblggh6j7vv?rtc=1&activetab=pivot:overviewtab)
<br>

## If you don't have Chrome:
1. Download and install *Google Chrome* [here](https://www.google.com/chrome/)
<br> 

## If you don't have Node or Python:
1. [Downlod and install node](https://nodejs.org/dist/v14.2.0/node-v14.2.0-x64.msi)
2. [Download and install Python](https://www.python.org/ftp/python/3.8.2/python-3.8.2-amd64.exe)
<br> 

## If you have all of the required accounts and applications:
1. [Download and extract the zip of this repo](https://github.com/darkwolfxj/my-rich-presence-api-for-discord-and-deezer/archive/master.zip), *make sure the files are extracted into your downloads folder.* You can move them later, but only after you complete step 2.
2. Execute the follow keyboard shortcuts and commands:
    - ``Windows Key + R``
    - Type ``cmd``
    - Press ``Enter``
    - Type the following command:
        - ``cd Downloads/my-rich-presence-api-for-discord-and-deezer-master``
        - Press ``Enter``
    - Type the following command exactly as it is written, only substituting your Facebook email and password (*keep the quotes*):
        ***My api will not save your information entered here.***
        - ``echo email="your Facebook login email" >> secrets.py``
        - Press ``Enter``
        - ``echo password="your Facebook password" >> secrets.py``
        - Press ``Enter``
        - ``echo {} >> token.json``
        - Press ``Enter``
    - Type ``npm install`` and press ``Enter``
    - Wait for this process to complete (Two to three minutes, if your PC is midrange or higher)
    - Type ``pip install requests selenium pynput`` and press ``Enter``
    - Wait for this process to complete (One minute at the most)
    - Type ``exit`` and press ``Enter``
3. Navigate to the ``my-rich-presence-api-for-discord-and-deezer-master`` folder
4. Right-click ``Start-Deezer-Rich-Presence`` and click ``Properties``
5. Check the box that says ``Unblock`` (This is so that Windows Defender won't block you from running the batch file. This is a simple protection used to prevent users from running files that could harm their PC)
6. Click ``OK`` 
7. Open your *Discord Desktop Client* and make sure you are logged in.
8. Click [here](http://discordapp.com/api/oauth2/authorize?response_type=code&client_id=709635687820820520&scope=rpc%20&state=15773059ghq9183habn&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fredirect&prompt=consent) and log in to your Discord account. Click ``Authorize`` to authorize the api to set your Discord status for you. (Close the window, when you're redirected to the failing page. If you were to already be running the api, you would see a blank page with the Deezer logo, as Deezer requires all apps using their API to display their Logo at least once.)
9. Double-click ``Start-Deezer-Rich-Presence.bat`` (If you have extensions hidden, it will just say ``Start-Deezer-Rich-Presence``) <br>
<br>
🎉 ***And that's it! Deezer is now interfaced with your Discord Status! Congratulations!*** 🎉 <br>
<br>
Brought you in part by Deezer API and Discord API <br>

![Deezer Logo](https://i.imgur.com/6M1Agln.png "Deezer") <br>

![logo](https://i.imgur.com/vslbSCW.png "Discord")