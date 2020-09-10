import app from './server'
import './database'

app.listen(app.get('port'), () => {
    console.log(`Server on http://localhost:${app.get('port')}`);
})