const venv = `python3 -m venv ~/ledfx-beta
source ~/ledfx-beta/bin/activate
python3 -m pip install git+https://github.com/LedFx/LedFx.git
cd ~/ledfx-beta
python3 -m pip uninstall numpy certifi CFFI -y
python3 -m pip install "numpy~=1.20.2" certifi CFFI --no-binary :all:`

export default venv
