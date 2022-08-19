fetch("/api/productos-test").then(async(data) => {
    const response = await data.json();
    
        socket.emit('client:product', response)
});

