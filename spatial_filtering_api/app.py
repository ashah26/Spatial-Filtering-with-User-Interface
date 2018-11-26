from flask import Flask
import os
from controller.home_controller import home

app = Flask(__name__)


if __name__ == '__main__':
    app.register_blueprint(home)
    app.run()
    port = int(os.environ.get('PORT', 5000))
    app.config['DEBUG'] = True
    app.run(host='0.0.0.0', port=port, debug=True)
    print("server started: ", port)
