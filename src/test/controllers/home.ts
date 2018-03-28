import 'mocha';

import { expect } from 'chai';
import { HomeController} from '../../Http/Controllers/HomeController';

describe('HomeController', () => {
    it('should give back `Home sweet home`', () => {
        let service = new HomeController();

        expect(service.home()).to.equal('Home sweet home');
    });
});