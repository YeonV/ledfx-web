const mbedtls = `brew install mbedtls@2
echo 'export PATH="/opt/homebrew/opt/mbedtls@2/bin:$PATH"' >> ~/.zshrc
export LDFLAGS="-L/opt/homebrew/opt/mbedtls@2/lib"
export CPPFLAGS="-I/opt/homebrew/opt/mbedtls@2/include"`

export default mbedtls
