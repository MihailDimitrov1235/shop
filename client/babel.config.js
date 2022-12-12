module.exports = function(api) {
    api.cache(true);
    return {
         presets: [
             '@babel/preset-env', // [A]
             ['@babel/preset-react', {"runtime": "automatic"}], // [B]
         ],
         plugins: [],
     };
};