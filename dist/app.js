/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/API/get_country_name.js":
/*!*************************************!*\
  !*** ./src/API/get_country_name.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_country_name)
/* harmony export */ });
async function get_country_name(country_code) {
  try {
    const country = await fetch(
      `https://restcountries.com/v2/alpha/${country_code}`
    );

    const data = await country.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/API/get_data.js":
/*!*****************************!*\
  !*** ./src/API/get_data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_data)
/* harmony export */ });
/* harmony import */ var _api_key_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-key.json */ "./src/API/api-key.json");


async function get_data({ lon, lat, unit }) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_api_key_json__WEBPACK_IMPORTED_MODULE_0__.openWeatherAPIKey}&units=${unit}`
    );

    const weather_data = await response.json();
    return weather_data;
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/API/get_lat_and_lon_from_city_name.js":
/*!***************************************************!*\
  !*** ./src/API/get_lat_and_lon_from_city_name.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_lat_and_lon_from_city_name)
/* harmony export */ });
/* harmony import */ var _api_key_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-key.json */ "./src/API/api-key.json");


async function get_lat_and_lon_from_city_name(city_name) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${_api_key_json__WEBPACK_IMPORTED_MODULE_0__.openWeatherAPIKey}`
    );

    const data = await response.json();

    return data[0];
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/core/get_data_by_city_name.js":
/*!*******************************************!*\
  !*** ./src/core/get_data_by_city_name.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_data_by_city_name)
/* harmony export */ });
/* harmony import */ var _API_get_lat_and_lon_from_city_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../API/get_lat_and_lon_from_city_name */ "./src/API/get_lat_and_lon_from_city_name.js");
/* harmony import */ var _API_get_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API/get_data */ "./src/API/get_data.js");
/* harmony import */ var _API_get_country_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../API/get_country_name */ "./src/API/get_country_name.js");




async function get_data_by_city_name(city_name, unit) {
  try {
    const city = await (0,_API_get_lat_and_lon_from_city_name__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name);
    const response = await (0,_API_get_data__WEBPACK_IMPORTED_MODULE_1__["default"])({
      lon: city.lon,
      lat: city.lat,
      unit: unit,
    });

    let country;
    if (response.sys.country === "GB") country = { name: "United Kingdom" };
    else {
      country = await (0,_API_get_country_name__WEBPACK_IMPORTED_MODULE_2__["default"])(response.sys.country);
    }

    const data = {
      current_temp: response.main.temp,
      feels_like: response.main.feels_like,
      humidity: response.main.humidity,
      wind_speed: response.wind.speed,
      status: response.weather[0].main,
      city: response.name,
      country: country.name,
    };
    return data;
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/ui/load_data.js":
/*!*****************************!*\
  !*** ./src/ui/load_data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ load_data)
/* harmony export */ });
/* harmony import */ var _core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/get_data_by_city_name */ "./src/core/get_data_by_city_name.js");
/* harmony import */ var _utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_element_by_id */ "./src/utils/get_element_by_id.js");
/* harmony import */ var _utils_units__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/units */ "./src/utils/units.js");




async function load_data(event) {
  if (event.key === "Enter") {
    try {
      const city_name = event.target.value;
      event.target.value = "";
      const unit = _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.name;
      const data = await (0,_core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name, unit);

      // DOM Cache
      const weather_condition_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("weather-condition");
      const city_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("city");
      const country_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("country");
      const current_temp_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("current_temp");
      const feels_like_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("feels_like");
      const wind_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("wind");
      const humidity_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("humidity");

      weather_condition_field.textContent = data.status;
      city_field.textContent = data.city.toUpperCase();
      country_field.textContent = data.country.toUpperCase();
      current_temp_field.innerHTML = `${data.current_temp}<sup><sup>0</sup>${
        unit === _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.name
          ? _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.temp_symbol
          : _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.temp_symbol
      }</sup>`;
      feels_like_field.innerHTML = `${data.feels_like}<sup><sup>0</sup>${
        unit === _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.name
          ? _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.temp_symbol
          : _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.temp_symbol
      }</sup>`;
      wind_field.textContent = `${data.wind_speed} ${
        unit === _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.name
          ? _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.speed_symbol
          : _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.speed_symbol
      }`;
      humidity_field.textContent = `${data.humidity}%`;
    } catch (e) {
      window.alert("Enter again");
      console.log(e);
    }
  }
}


/***/ }),

/***/ "./src/ui/page_load.js":
/*!*****************************!*\
  !*** ./src/ui/page_load.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ page_load)
/* harmony export */ });
/* harmony import */ var _core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/get_data_by_city_name */ "./src/core/get_data_by_city_name.js");
/* harmony import */ var _utils_event_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/event_bind */ "./src/utils/event_bind.js");
/* harmony import */ var _utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/get_element_by_id */ "./src/utils/get_element_by_id.js");
/* harmony import */ var _utils_units__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/units */ "./src/utils/units.js");
/* harmony import */ var _load_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./load_data */ "./src/ui/load_data.js");






async function page_load(city_name, unit) {
  const data = await (0,_core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name, unit);

  // DOM Cache
  const weather_condition_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("weather-condition");
  const city_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("city");
  const country_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("country");
  const current_temp_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("current_temp");
  const feels_like_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("feels_like");
  const wind_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("wind");
  const humidity_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("humidity");

  const search_city_input = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("city_search");

  weather_condition_field.textContent = data.status;
  city_field.textContent = data.city.toUpperCase();
  country_field.textContent = data.country.toUpperCase();
  current_temp_field.innerHTML = `${data.current_temp}<sup><sup>0</sup>${
    unit === _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.name
      ? _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.temp_symbol
      : _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].METRIC.temp_symbol
  }</sup>`;
  feels_like_field.innerHTML = `${data.feels_like}<sup><sup>0</sup>${
    unit === _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.name
      ? _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.temp_symbol
      : _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].METRIC.temp_symbol
  }</sup>`;
  wind_field.textContent = `${data.wind_speed} ${
    unit === _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.name
      ? _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.speed_symbol
      : _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].METRIC.speed_symbol
  }`;
  humidity_field.textContent = `${data.humidity}%`;

  (0,_utils_event_bind__WEBPACK_IMPORTED_MODULE_1__["default"])({
    event: "keydown",
    fn: _load_data__WEBPACK_IMPORTED_MODULE_4__["default"],
    element: search_city_input,
  });
}


/***/ }),

/***/ "./src/utils/event_bind.js":
/*!*********************************!*\
  !*** ./src/utils/event_bind.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ event_bind)
/* harmony export */ });
function event_bind({ event, fn, element }) {
  if (!(element instanceof NodeList)) {
    element.addEventListener(event, fn);
    return;
  }

  element.forEach((ele) => {
    ele.addEventListener(event, fn);
  });
}


/***/ }),

/***/ "./src/utils/get_element_by_id.js":
/*!****************************************!*\
  !*** ./src/utils/get_element_by_id.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_element_by_id)
/* harmony export */ });
function get_element_by_id(id) {
  return document.getElementById(id);
}


/***/ }),

/***/ "./src/utils/units.js":
/*!****************************!*\
  !*** ./src/utils/units.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const units = {
  IMPERIAL: {
    name: "imperial",
    temp_symbol: "F",
    speed_symbol: "MPH",
  },
  METRIC: {
    name: "metric",
    temp_symbol: "C",
    speed_symbol: "KMPH",
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (units);


/***/ }),

/***/ "./src/API/api-key.json":
/*!******************************!*\
  !*** ./src/API/api-key.json ***!
  \******************************/
/***/ ((module) => {

module.exports = JSON.parse('{"openWeatherAPIKey":"306fecd6fde571057036731a5044cefd"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_page_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/page_load */ "./src/ui/page_load.js");
/* harmony import */ var _utils_units__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/units */ "./src/utils/units.js");



const city_name = "panadura";
const unit = _utils_units__WEBPACK_IMPORTED_MODULE_1__["default"].METRIC.name;
(0,_ui_page_load__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name, unit);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7QUM3Q2Usc0JBQXNCLG9CQUFvQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNUZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQ2JyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNMOztBQUVsQztBQUNBLGFBQWEsZ0VBQWlCO0FBQzlCLHlEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvQVBJL2dldF9jb3VudHJ5X25hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvQVBJL2dldF9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL0FQSS9nZXRfbGF0X2FuZF9sb25fZnJvbV9jaXR5X25hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29yZS9nZXRfZGF0YV9ieV9jaXR5X25hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdWkvbG9hZF9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VpL3BhZ2VfbG9hZC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91dGlscy9ldmVudF9iaW5kLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzL2dldF9lbGVtZW50X2J5X2lkLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzL3VuaXRzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldF9jb3VudHJ5X25hbWUoY291bnRyeV9jb2RlKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY291bnRyeSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vcmVzdGNvdW50cmllcy5jb20vdjIvYWxwaGEvJHtjb3VudHJ5X2NvZGV9YFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY291bnRyeS5qc29uKCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG4iLCJpbXBvcnQgYXBpX2tleSBmcm9tIFwiLi9hcGkta2V5Lmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0X2RhdGEoeyBsb24sIGxhdCwgdW5pdCB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlfa2V5Lm9wZW5XZWF0aGVyQVBJS2V5fSZ1bml0cz0ke3VuaXR9YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyX2RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHdlYXRoZXJfZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG4iLCJpbXBvcnQgYXBpX2tleSBmcm9tIFwiLi9hcGkta2V5Lmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0X2xhdF9hbmRfbG9uX2Zyb21fY2l0eV9uYW1lKGNpdHlfbmFtZSkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtjaXR5X25hbWV9JmFwcGlkPSR7YXBpX2tleS5vcGVuV2VhdGhlckFQSUtleX1gXG4gICAgKTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZGF0YVswXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG4iLCJpbXBvcnQgZ2V0X2xhdF9hbmRfbG9uX2Zyb21fY2l0eV9uYW1lIGZyb20gXCIuLi9BUEkvZ2V0X2xhdF9hbmRfbG9uX2Zyb21fY2l0eV9uYW1lXCI7XG5pbXBvcnQgZ2V0X2RhdGEgZnJvbSBcIi4uL0FQSS9nZXRfZGF0YVwiO1xuaW1wb3J0IGdldF9jb3VudHJ5X25hbWUgZnJvbSBcIi4uL0FQSS9nZXRfY291bnRyeV9uYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldF9kYXRhX2J5X2NpdHlfbmFtZShjaXR5X25hbWUsIHVuaXQpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaXR5ID0gYXdhaXQgZ2V0X2xhdF9hbmRfbG9uX2Zyb21fY2l0eV9uYW1lKGNpdHlfbmFtZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRfZGF0YSh7XG4gICAgICBsb246IGNpdHkubG9uLFxuICAgICAgbGF0OiBjaXR5LmxhdCxcbiAgICAgIHVuaXQ6IHVuaXQsXG4gICAgfSk7XG5cbiAgICBsZXQgY291bnRyeTtcbiAgICBpZiAocmVzcG9uc2Uuc3lzLmNvdW50cnkgPT09IFwiR0JcIikgY291bnRyeSA9IHsgbmFtZTogXCJVbml0ZWQgS2luZ2RvbVwiIH07XG4gICAgZWxzZSB7XG4gICAgICBjb3VudHJ5ID0gYXdhaXQgZ2V0X2NvdW50cnlfbmFtZShyZXNwb25zZS5zeXMuY291bnRyeSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGN1cnJlbnRfdGVtcDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgZmVlbHNfbGlrZTogcmVzcG9uc2UubWFpbi5mZWVsc19saWtlLFxuICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4uaHVtaWRpdHksXG4gICAgICB3aW5kX3NwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgY291bnRyeTogY291bnRyeS5uYW1lLFxuICAgIH07XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuIiwiaW1wb3J0IGdldF9kYXRhX2J5X2NpdHlfbmFtZSBmcm9tIFwiLi4vY29yZS9nZXRfZGF0YV9ieV9jaXR5X25hbWVcIjtcbmltcG9ydCBnZXRfZWxlbWVudF9ieV9pZCBmcm9tIFwiLi4vdXRpbHMvZ2V0X2VsZW1lbnRfYnlfaWRcIjtcbmltcG9ydCB1bml0cyBmcm9tIFwiLi4vdXRpbHMvdW5pdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbG9hZF9kYXRhKGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjaXR5X25hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICBldmVudC50YXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgY29uc3QgdW5pdCA9IHVuaXRzLk1FVFJJQy5uYW1lO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldF9kYXRhX2J5X2NpdHlfbmFtZShjaXR5X25hbWUsIHVuaXQpO1xuXG4gICAgICAvLyBET00gQ2FjaGVcbiAgICAgIGNvbnN0IHdlYXRoZXJfY29uZGl0aW9uX2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJ3ZWF0aGVyLWNvbmRpdGlvblwiKTtcbiAgICAgIGNvbnN0IGNpdHlfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImNpdHlcIik7XG4gICAgICBjb25zdCBjb3VudHJ5X2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJjb3VudHJ5XCIpO1xuICAgICAgY29uc3QgY3VycmVudF90ZW1wX2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJjdXJyZW50X3RlbXBcIik7XG4gICAgICBjb25zdCBmZWVsc19saWtlX2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJmZWVsc19saWtlXCIpO1xuICAgICAgY29uc3Qgd2luZF9maWVsZCA9IGdldF9lbGVtZW50X2J5X2lkKFwid2luZFwiKTtcbiAgICAgIGNvbnN0IGh1bWlkaXR5X2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJodW1pZGl0eVwiKTtcblxuICAgICAgd2VhdGhlcl9jb25kaXRpb25fZmllbGQudGV4dENvbnRlbnQgPSBkYXRhLnN0YXR1cztcbiAgICAgIGNpdHlfZmllbGQudGV4dENvbnRlbnQgPSBkYXRhLmNpdHkudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvdW50cnlfZmllbGQudGV4dENvbnRlbnQgPSBkYXRhLmNvdW50cnkudG9VcHBlckNhc2UoKTtcbiAgICAgIGN1cnJlbnRfdGVtcF9maWVsZC5pbm5lckhUTUwgPSBgJHtkYXRhLmN1cnJlbnRfdGVtcH08c3VwPjxzdXA+MDwvc3VwPiR7XG4gICAgICAgIHVuaXQgPT09IHVuaXRzLklNUEVSSUFMLm5hbWVcbiAgICAgICAgICA/IHVuaXRzLklNUEVSSUFMLnRlbXBfc3ltYm9sXG4gICAgICAgICAgOiB1bml0cy5NRVRSSUMudGVtcF9zeW1ib2xcbiAgICAgIH08L3N1cD5gO1xuICAgICAgZmVlbHNfbGlrZV9maWVsZC5pbm5lckhUTUwgPSBgJHtkYXRhLmZlZWxzX2xpa2V9PHN1cD48c3VwPjA8L3N1cD4ke1xuICAgICAgICB1bml0ID09PSB1bml0cy5JTVBFUklBTC5uYW1lXG4gICAgICAgICAgPyB1bml0cy5JTVBFUklBTC50ZW1wX3N5bWJvbFxuICAgICAgICAgIDogdW5pdHMuTUVUUklDLnRlbXBfc3ltYm9sXG4gICAgICB9PC9zdXA+YDtcbiAgICAgIHdpbmRfZmllbGQudGV4dENvbnRlbnQgPSBgJHtkYXRhLndpbmRfc3BlZWR9ICR7XG4gICAgICAgIHVuaXQgPT09IHVuaXRzLklNUEVSSUFMLm5hbWVcbiAgICAgICAgICA/IHVuaXRzLklNUEVSSUFMLnNwZWVkX3N5bWJvbFxuICAgICAgICAgIDogdW5pdHMuTUVUUklDLnNwZWVkX3N5bWJvbFxuICAgICAgfWA7XG4gICAgICBodW1pZGl0eV9maWVsZC50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2luZG93LmFsZXJ0KFwiRW50ZXIgYWdhaW5cIik7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBnZXRfZGF0YV9ieV9jaXR5X25hbWUgZnJvbSBcIi4uL2NvcmUvZ2V0X2RhdGFfYnlfY2l0eV9uYW1lXCI7XG5pbXBvcnQgZXZlbnRfYmluZCBmcm9tIFwiLi4vdXRpbHMvZXZlbnRfYmluZFwiO1xuaW1wb3J0IGdldF9lbGVtZW50X2J5X2lkIGZyb20gXCIuLi91dGlscy9nZXRfZWxlbWVudF9ieV9pZFwiO1xuaW1wb3J0IHVuaXRzIGZyb20gXCIuLi91dGlscy91bml0c1wiO1xuaW1wb3J0IGxvYWRfZGF0YSBmcm9tIFwiLi9sb2FkX2RhdGFcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gcGFnZV9sb2FkKGNpdHlfbmFtZSwgdW5pdCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0X2RhdGFfYnlfY2l0eV9uYW1lKGNpdHlfbmFtZSwgdW5pdCk7XG5cbiAgLy8gRE9NIENhY2hlXG4gIGNvbnN0IHdlYXRoZXJfY29uZGl0aW9uX2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJ3ZWF0aGVyLWNvbmRpdGlvblwiKTtcbiAgY29uc3QgY2l0eV9maWVsZCA9IGdldF9lbGVtZW50X2J5X2lkKFwiY2l0eVwiKTtcbiAgY29uc3QgY291bnRyeV9maWVsZCA9IGdldF9lbGVtZW50X2J5X2lkKFwiY291bnRyeVwiKTtcbiAgY29uc3QgY3VycmVudF90ZW1wX2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJjdXJyZW50X3RlbXBcIik7XG4gIGNvbnN0IGZlZWxzX2xpa2VfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImZlZWxzX2xpa2VcIik7XG4gIGNvbnN0IHdpbmRfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcIndpbmRcIik7XG4gIGNvbnN0IGh1bWlkaXR5X2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJodW1pZGl0eVwiKTtcblxuICBjb25zdCBzZWFyY2hfY2l0eV9pbnB1dCA9IGdldF9lbGVtZW50X2J5X2lkKFwiY2l0eV9zZWFyY2hcIik7XG5cbiAgd2VhdGhlcl9jb25kaXRpb25fZmllbGQudGV4dENvbnRlbnQgPSBkYXRhLnN0YXR1cztcbiAgY2l0eV9maWVsZC50ZXh0Q29udGVudCA9IGRhdGEuY2l0eS50b1VwcGVyQ2FzZSgpO1xuICBjb3VudHJ5X2ZpZWxkLnRleHRDb250ZW50ID0gZGF0YS5jb3VudHJ5LnRvVXBwZXJDYXNlKCk7XG4gIGN1cnJlbnRfdGVtcF9maWVsZC5pbm5lckhUTUwgPSBgJHtkYXRhLmN1cnJlbnRfdGVtcH08c3VwPjxzdXA+MDwvc3VwPiR7XG4gICAgdW5pdCA9PT0gdW5pdHMuSU1QRVJJQUwubmFtZVxuICAgICAgPyB1bml0cy5JTVBFUklBTC50ZW1wX3N5bWJvbFxuICAgICAgOiB1bml0cy5NRVRSSUMudGVtcF9zeW1ib2xcbiAgfTwvc3VwPmA7XG4gIGZlZWxzX2xpa2VfZmllbGQuaW5uZXJIVE1MID0gYCR7ZGF0YS5mZWVsc19saWtlfTxzdXA+PHN1cD4wPC9zdXA+JHtcbiAgICB1bml0ID09PSB1bml0cy5JTVBFUklBTC5uYW1lXG4gICAgICA/IHVuaXRzLklNUEVSSUFMLnRlbXBfc3ltYm9sXG4gICAgICA6IHVuaXRzLk1FVFJJQy50ZW1wX3N5bWJvbFxuICB9PC9zdXA+YDtcbiAgd2luZF9maWVsZC50ZXh0Q29udGVudCA9IGAke2RhdGEud2luZF9zcGVlZH0gJHtcbiAgICB1bml0ID09PSB1bml0cy5JTVBFUklBTC5uYW1lXG4gICAgICA/IHVuaXRzLklNUEVSSUFMLnNwZWVkX3N5bWJvbFxuICAgICAgOiB1bml0cy5NRVRSSUMuc3BlZWRfc3ltYm9sXG4gIH1gO1xuICBodW1pZGl0eV9maWVsZC50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JWA7XG5cbiAgZXZlbnRfYmluZCh7XG4gICAgZXZlbnQ6IFwia2V5ZG93blwiLFxuICAgIGZuOiBsb2FkX2RhdGEsXG4gICAgZWxlbWVudDogc2VhcmNoX2NpdHlfaW5wdXQsXG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZlbnRfYmluZCh7IGV2ZW50LCBmbiwgZWxlbWVudCB9KSB7XG4gIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlTGlzdCkpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBlbGVtZW50LmZvckVhY2goKGVsZSkgPT4ge1xuICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0X2VsZW1lbnRfYnlfaWQoaWQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn1cbiIsImNvbnN0IHVuaXRzID0ge1xuICBJTVBFUklBTDoge1xuICAgIG5hbWU6IFwiaW1wZXJpYWxcIixcbiAgICB0ZW1wX3N5bWJvbDogXCJGXCIsXG4gICAgc3BlZWRfc3ltYm9sOiBcIk1QSFwiLFxuICB9LFxuICBNRVRSSUM6IHtcbiAgICBuYW1lOiBcIm1ldHJpY1wiLFxuICAgIHRlbXBfc3ltYm9sOiBcIkNcIixcbiAgICBzcGVlZF9zeW1ib2w6IFwiS01QSFwiLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdW5pdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwYWdlX2xvYWQgZnJvbSBcIi4vdWkvcGFnZV9sb2FkXCI7XG5pbXBvcnQgdW5pdHMgZnJvbSBcIi4vdXRpbHMvdW5pdHNcIjtcblxuY29uc3QgY2l0eV9uYW1lID0gXCJwYW5hZHVyYVwiO1xuY29uc3QgdW5pdCA9IHVuaXRzLk1FVFJJQy5uYW1lO1xucGFnZV9sb2FkKGNpdHlfbmFtZSwgdW5pdCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=