/// <reference types="sinon" />

import * as mocha from 'mocha';
import { assert, expect } from 'chai';
import { shallow, mount } from 'enzyme';


import * as React from 'react';
import { ViewList } from './ViewList';
import { IViewListProps } from './IViewListProps';

import { IDateService } from '../util/IDateService';

declare const sinon: sinon.SinonStatic;

describe('ViewList tests', () => {

    describe('basic rendering', () => {
        let sut;
        let mockedDateService: IDateService = { format: sinon.mock() };
        const props: IViewListProps = {
            books: [],
            onItemSelected: sinon.mock(),
            dateService: mockedDateService
        };

        beforeEach(() => {
            sut = shallow(<ViewList {...props} />);
        });

        it.skip('BookList header is displayed', () => {
            expect(sut.contains()).to.equal(true);
        });

        it('check that fillRows is called once for rendering', () => {

            //setup spy
            let viewListInstance = sut.instance();
            sinon.spy(viewListInstance, "fillRows");

            //force update to trigger render
            viewListInstance.forceUpdate();

            expect(viewListInstance.fillRows.calledOnce).to.be.equal(true);

            //unwrap the spy
            viewListInstance.fillRows.restore();
        });
    });

    describe('#fillRows', () => {
        let sut;// ViewList;
        let mockedDateService: IDateService = {
            format: (date: Date, emptySymbol: string) => {
                return "-";
            }
        };
        const props: IViewListProps = {
            books: [],
            onItemSelected: sinon.mock(),
            dateService: mockedDateService
        };

        beforeEach(() => {
            sut = shallow(<ViewList {...props} />).instance();
        });

        const bookParamInput = [
            {
                input: [],
                expected: 0
            },
            {
                input: [{ isbn: 'AAA', name: 'Name1', description: 'smth', pubDate: new Date() }],
                expected: 1
            },
            {
                input:
                    [
                        { isbn: 'AAA', name: 'Name1', description: 'smth', pubDate: new Date() },
                        { isbn: 'BBB', name: 'NameBBB', description: 'smthB', pubDate: new Date() }],
                expected: 2
            }
        ];

        bookParamInput.map((row) => {
            it(row.input.length + ' books -> ' + row.expected + ' rows', () => {
                let items: {}[] = sut.fillRows(row.input);
                assert(items.length === row.expected);
            });
        });
    });

});