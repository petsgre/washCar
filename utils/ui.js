function showToast (title) {
    wx.showToast({
        title,
        icon: 'none'
    });
}

module.exports = {
    showToast
};
