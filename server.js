const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const axios = require('axios');
const { setResponseData, getResponseData } = require('./sharedData');

const app = express();
const port = 3000;

//Homepage
app.use(express.static('.public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/home/index.html'));
});
app.get('/public/home/index.mjs', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.resolve('public/home/index.mjs'));
});

//Favicon
app.get('/Screenshot-_48_.png', (req, res) => {
    res.type('image/png');
    res.sendFile(path.resolve('public/Screenshot-_48_.png'));
});

//Top Anime Page
app.get('/topanimes', (req, res) => {
    res.sendFile(path.resolve('./public/topanimes/topanimes.html'));
});
app.get('/topanimes.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.resolve('public/topanimes/topanimes.js'));
});

//Top Manga Page
app.get('/topmangas', (req, res) => {
    res.sendFile(path.resolve('./public/topmangas/topmangas.html'));
});
app.get('/topmangas.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.resolve('public/topmangas/topmangas.js'));
});

//Search Page
app.get('/search', (req, res) => {
    res.sendFile(path.resolve('./public/search/search.html'));
});
app.get('/search.mjs', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.resolve('public/search/search.mjs'));
});

// Template Engine Setup
const templatePath = path.join(__dirname, './templates/views');
app.set('view engine', 'hbs');
app.set('views', templatePath);

app.use(bodyParser.json());

//Post Requests Handlers
app.post('/search', async (req, res) => {
    const { id } = req.body;
    let responseData
    try {
        const response = await axios.request(`https://myanimelist.p.rapidapi.com/anime/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        });

        responseData = response.data; // Store the API response data
        setResponseData(responseData);
        if (!id) {
            return res.status(400).send({ status: 'failed' });
        }
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: 'error' });
    }
})
app.post('/topanimes', async (req, res) => {
    const { id } = req.body;
    let responseData
    try {
        const response = await axios.request(`https://myanimelist.p.rapidapi.com/anime/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        });

        responseData = response.data; // Store the API response data
        setResponseData(responseData);
        if (!id) {
            return res.status(400).send({ status: 'failed' });
        }
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: 'error' });
    }
})
app.post('/topmangas', async (req, res) => {
    const { id } = req.body;
    let responseData
    try {
        const response = await axios.request(`https://myanimelist.p.rapidapi.com/anime/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        });

        responseData = response.data; // Store the API response data
        setResponseData(responseData);
        if (!id) {
            return res.status(400).send({ status: 'failed' });
        }
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: 'error' });
    }
})
app.post('/searchresults', async (req, res) => {
    const { id } = req.body;
    let responseData
    try {
        const response = await axios.request(`https://myanimelist.p.rapidapi.com/anime/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        });

        responseData = response.data; // Store the API response data
        setResponseData(responseData);
        if (!id) {
            return res.status(400).send({ status: 'failed' });
        }
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: 'error' });
    }
})

//Recommendations API Handler
const options = {
    method: 'GET',
    url: 'https://myanimelist.p.rapidapi.com/anime/recommendations/1',
    headers: {
        'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
};

const recommendationsFunc = async () => {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
hbs.registerPartials(path.resolve('templates/partials'));

app.get(`/searchresults`, async (req, res) => {
    try {
        const recommendations = await recommendationsFunc();
        // console.log(recommendations.recommendations);
        const finalRecommendations = recommendations.recommendations.splice(0, 5);
        console.log(finalRecommendations[0].recommendation.myanimelist_id);
        const responseData = getResponseData();
        // console.log(responseData);
        res.render('searchResults', {
            Recommendations0Name: finalRecommendations[0].recommendation.title,
            Recommendations0Picture: finalRecommendations[0].recommendation.picture_url,
            Recommendations0Id: finalRecommendations[0].recommendation.myanimelist_id,
            Recommendations1Name: finalRecommendations[1].recommendation.title,
            Recommendations1Picture: finalRecommendations[1].recommendation.picture_url,
            Recommendations1Id: finalRecommendations[1].recommendation.myanimelist_id,
            Recommendations2Name: finalRecommendations[2].recommendation.title,
            Recommendations2Picture: finalRecommendations[2].recommendation.picture_url,
            Recommendations2Id: finalRecommendations[2].recommendation.myanimelist_id,
            Recommendations3Name: finalRecommendations[3].recommendation.title,
            Recommendations3Picture: finalRecommendations[3].recommendation.picture_url,
            Recommendations3Id: finalRecommendations[3].recommendation.myanimelist_id,
            Recommendations4Name: finalRecommendations[4].recommendation.title,
            Recommendations4Picture: finalRecommendations[4].recommendation.picture_url,
            Recommendations4Id: finalRecommendations[4].recommendation.myanimelist_id,
            data: responseData,
            type: responseData.information.type[0].name,
            studio: responseData.information.studios[0].name,
            premiered: responseData.information.premiered[0].name,
            producers: responseData.information.producers[0].name,
            genres: responseData.information.genres[0].name,
            themes: responseData.information.theme[0].name
        });
    } catch (err) {
        console.log('Error:', err);
        res.redirect('/');
    }
});
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});

