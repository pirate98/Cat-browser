import React from 'react';
import { useCatsByBreed } from '../apis/getCatsByBreed';
import CatCard from './CatCard';
import { Cat } from '../types';
import { Row, Button } from 'antd';
import Spinner from './Spinner';

interface CatCardGridProps {
    breedId: string;
}

const CatCardGrid: React.FC<CatCardGridProps> = ({ breedId }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useCatsByBreed(breedId);

    const cats = data?.pages.flat(1) as Cat[];
    let result: Cat[] = [];
    if (typeof cats !== 'undefined') {
        result = Object.values(cats.reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {}));
    }
    return status === 'loading' ? (
        <Spinner />
    ) : status === 'error' ? (
        <p>error...</p>
    ) : (
        <>
            <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 32 }} justify="space-between">
                {result.map((item) => (
                    <CatCard key={item.id} item={item} />
                ))}
            </Row>
            <Row justify="center">
                {hasNextPage && (
                    <Button
                        type="primary"
                        style={{ margin: 10, textAlign: 'center' }}
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </Button>
                )}
            </Row>
        </>
    );
};

export default CatCardGrid;
