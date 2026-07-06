(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MineradioAppSettings = api;
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
  var LOGIN_PROVIDER_KEYS = ['netease', 'qq', 'kugou'];
  var DEFAULT_LOGIN_PROVIDERS = { netease: true, qq: true, kugou: true };

  function normalizeLoginProviders(value) {
    var source = value && typeof value === 'object' ? value : {};
    var next = { netease: true, qq: true, kugou: true };
    for (var i = 0; i < LOGIN_PROVIDER_KEYS.length; i++) {
      var key = LOGIN_PROVIDER_KEYS[i];
      if (typeof source[key] === 'boolean') next[key] = source[key];
    }
    return next;
  }

  function mergeLoginProviders(base, patch) {
    return normalizeLoginProviders(Object.assign({}, normalizeLoginProviders(base), patch || {}));
  }

  function normalizeStartupPrefs(value) {
    var source = value && typeof value === 'object' ? value : {};
    return {
      skipSplashOnStartup: !!source.skipSplashOnStartup,
      // 默认开启自动视觉引导；仅显式 false 时关闭
      autoVisualGuide: source.autoVisualGuide !== false
    };
  }

  function mergeStartupPrefs(base, patch) {
    return normalizeStartupPrefs(Object.assign({}, normalizeStartupPrefs(base), patch || {}));
  }

  return {
    LOGIN_PROVIDER_KEYS: LOGIN_PROVIDER_KEYS,
    DEFAULT_LOGIN_PROVIDERS: DEFAULT_LOGIN_PROVIDERS,
    normalizeLoginProviders: normalizeLoginProviders,
    mergeLoginProviders: mergeLoginProviders,
    normalizeStartupPrefs: normalizeStartupPrefs,
    mergeStartupPrefs: mergeStartupPrefs
  };
});
