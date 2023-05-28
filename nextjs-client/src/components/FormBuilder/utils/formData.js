export default function formData(values, files = [], fileSelectors = []) {
    const data = new FormData();

    files.forEach((file) => {
      data.append('files[]', file);
    });

    fileSelectors.forEach((selector) => {
        if(values[selector]) {
            values[selector].forEach((file) => {
                data.append(selector + '[]', file);
            })
        }
    });

    Object.keys(values).forEach(key => {
      if (typeof values[key] === 'object' || Array.isArray(values[key])) {
        data.append(key, JSON.stringify(values[key]));
      } else {
        data.append(key, values[key]);
      }
    });

    return data;
}