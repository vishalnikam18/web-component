(function(){
    window.hotelCode = 1098;
    const envProfile = {
        env: 't4',
        tokens: {
            'oAuthToken': window.token
        }
    };
    TCCommonService.InitializerService.initialize( envProfile );
})();