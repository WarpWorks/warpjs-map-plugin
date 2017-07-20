module.exports = {
    default: {
        options: {
            compress: true
        },
        files: [{
            src: 'client/style.less',
            dest: 'assets/style.min.css'
        }]
    }
};
