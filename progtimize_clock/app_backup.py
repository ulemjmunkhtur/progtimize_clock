import datetime as dt
import os.path
from flask import Flask, redirect, request, session, url_for

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

app = Flask(__name__)
app.secret_key = 'rfbjhiwrnfxiuwehndfhiuwen34'  # Change this to a secret value

SCOPES = ["https://www.googleapis.com/auth/calendar"]

# Set the base URL for your application
BASE_URL = 'https://progtimizeclock.study'

@app.route('/')
def index():
    if 'credentials' not in session:
        return redirect(url_for('authorize'))
    
    creds = Credentials(**session['credentials'])
    
    service = build("calendar", "v3", credentials=creds)
    
    # Get the start and end times for the current day
    today_start = dt.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0).isoformat() + 'Z'
    today_end = dt.datetime.utcnow().replace(hour=23, minute=59, second=59, microsecond=999999).isoformat() + 'Z'
    
    # Fetch all events for the current day
    events_result = service.events().list(calendarId='primary', timeMin=today_start, timeMax=today_end, singleEvents=True, orderBy='startTime').execute()
    events = events_result.get('items', [])

    return '<br>'.join([event['summary'] for event in events])

@app.route('/authorize')
def authorize():
    flow = Flow.from_client_secrets_file('credentials.json', SCOPES)
    flow.redirect_uri = f'{BASE_URL}/callback'  # Use the HTTPS version of the callback URL
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true')
    
    session['state'] = state
    return redirect(authorization_url)

@app.route('/callback')
def callback():
    state = session['state']
    
    flow = Flow.from_client_secrets_file('credentials.json', SCOPES, state=state)
    flow.redirect_uri = f'{BASE_URL}/callback'  # Use the HTTPS version of the callback URL
    
    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)
    
    session['credentials'] = dict(flow.credentials)

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run()  # Remove host and port parameters
