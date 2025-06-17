import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function getBreadCrumbName(breadCrumbElement, breadCrumbElementId, getPerson, getPlanet) {
    if (!breadCrumbElementId) return breadCrumbElement;

    const entityResolvers = {
        planets: (id) => getPlanet(id)?.name,
        people: (id) => getPerson(id)?.name,
        residents: (id) => getPerson(id)?.name
    };

    const selectedResolver = entityResolvers[breadCrumbElement];
    return selectedResolver ? selectedResolver(breadCrumbElementId) : breadCrumbElementId;
}

function getBreadCrumbLink(segments, i, breadCrumbElementId, isFirst, isLast) {
    if (isLast) return undefined;

    return isFirst && breadCrumbElementId
        ? `/${segments.slice(0, 2).join('/')}`
        : `/${segments.slice(0, i).join('/')}`;
}

function determinePaths({ getPerson, getPlanet }, path) {
    const segments = path.slice(1).split('/');

    if (segments.length === 1) return [{ name: segments[0] }];

    const breadcrumbs = [{ name: segments[0], to: `/${segments[0]}` }];

    for (let i = 0; i < segments.length; i += 2) {
        const segment = segments[i];
        const segmentId = segments[i + 1];
        const isFirst = i === 0;
        const isLast = i + 2 >= segments.length;

        const name = getBreadCrumbName(segment, segmentId, getPerson, getPlanet);
        const to = getBreadCrumbLink(segments, i, segmentId, isFirst, isLast);

        breadcrumbs.push({ name, to });
    }

    return breadcrumbs;
}

export function useBreadcrumbs({ getPerson, getPlanet }) {
    const location = useLocation();

    return useMemo(() => {
        return determinePaths({ getPerson, getPlanet }, location.pathname);
    }, [location.pathname]);
}
